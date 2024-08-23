import asyncio
import pickle

from ceylon import CoreAdmin

from agents.InterfaceAgent import InterfaceAgent
from agents.data_agents.NewsCollectingAnalysisAgent import NewsCollectingAnalysisAgent
from agents.process_agent import ProcessAgent

workspace_id = "main"
workspace_port = 7878


async def main():
    runner = CoreAdmin(name=workspace_id, port=workspace_port, server_mode=True)

    interface_agent = InterfaceAgent(name="interface", role="Communicate with outside", workspace_id=workspace_id,
                                     admin_port=workspace_port)
    processor_agent = ProcessAgent(name="processor", role="Process user requests", workspace_id=workspace_id,
                                   admin_port=workspace_port)

    news_collecting_agent = NewsCollectingAnalysisAgent(
        base_url="https://www.dailymirror.lk",
        name="news_collector",
        role="Collect news",
        workspace_id=workspace_id,
        admin_port=workspace_port
    )

    await runner.arun_admin(inputs=pickle.dumps({}), workers=[processor_agent, interface_agent, news_collecting_agent])


if __name__ == "__main__":

    # enable_log("info")
    asyncio.run(main())
