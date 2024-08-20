import enum
from datetime import datetime
from uuid import uuid4

from pydantic import BaseModel, Field, field_serializer


class Message(BaseModel):
    message: str = Field(min_length=1, max_length=100)
    sender: str = Field(min_length=1, max_length=100)
    time: datetime = Field(default_factory=datetime.now)
    type: str = Field(min_length=1, max_length=100)


class SystemMessageType(str, enum.Enum):
    human_interaction = "human_interaction"
    system_message = "system_message"


class SystemMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    type: SystemMessageType = Field(min_length=1, max_length=100, default=SystemMessageType.system_message)
    message: str = Field(min_length=1, max_length=100)
    time: datetime = Field(default_factory=datetime.now)

    @field_serializer('time')
    def serialize_dt(self, dt: datetime, _info):
        return dt.timestamp()


if __name__ == '__main__':
    msg = SystemMessage(
        type=SystemMessageType.human_interaction,
        message="What is this?"
    )
    print(msg)
    print(msg.model_dump())
