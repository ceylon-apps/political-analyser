from ceylon import Agent
from loguru import logger


class NewsCollectingAnalysisAgent(Agent):
    base_url: str

    def __init__(self, base_url: str, *args, **kwargs):
        self.base_url = base_url
        super().__init__(*args, **kwargs)

    async def run(self, inputs: "bytes"):
        logger.info(f"NewsCollectingAnalysisAgent running with: {self.base_url}")
