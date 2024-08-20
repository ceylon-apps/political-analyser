import pickle

import socketio
from ceylon import Agent, on_message
from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
from uvicorn import Config, Server

from data.message import Message, SystemMessage
from data.user_details import UserDetails

# Create a new AsyncServer
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')

sio_asgi_app = socketio.ASGIApp(socketio_server=sio, other_asgi_app=app)


class InterfaceAgent(Agent):

    async def run(self, inputs: "bytes"):
        @app.get("/")
        async def read_root():
            return {"message": "Hello World"}

        @app.post("/api/chat")
        async def send_message(message: Message):
            await self.broadcast_data(message)
            logger.info(f"Sent message: {message}")

        # Example Socket.IO event handler
        @sio.event
        async def connect(sid, environ):
            logger.debug(f"Client connected: {sid}")
            await self.broadcast_data(UserDetails(name="test", email="test"))

        @sio.event
        async def disconnect(sid):
            logger.debug(f"Client disconnected: {sid}")

            # Start the Socket.IO server

        config = Config(app=sio_asgi_app, host="0.0.0.0", port=7878, log_level="error")
        server = Server(config)
        await server.serve()

    # async def on_message(self, agent_id: "str", data: "bytes", time: "int"):
    #     logger.info(f"Received message from {agent_id}: {data}")
    #     data = pickle.loads(data)
    #     logger.info(f"Received message from {agent_id}: {data}")

    @on_message(SystemMessage)
    async def on_system_message(self, message: SystemMessage, agent_id: "str", time: "int"):
        logger.info(f"Received system message from {agent_id}: {message}")
        await sio.emit("system_message", message.model_dump())
