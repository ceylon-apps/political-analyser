import asyncio
import pickle

from ceylon import CoreAdmin

from agents.InterfaceAgent import InterfaceAgent
from agents.process_agent import ProcessAgent


async def main():
    runner = CoreAdmin(name="main", port=7878, server_mode=True)

    interface_agent = InterfaceAgent(name="interface", role="Communicate with outside", workspace_id="main",
                                     admin_port=7878)
    processor_agent = ProcessAgent(name="processor", role="Process user requests", workspace_id="main", admin_port=7878)

    await runner.arun_admin(inputs=pickle.dumps({}), workers=[processor_agent, interface_agent])


if __name__ == "__main__":
    # enable_log("info")
    asyncio.run(main())
