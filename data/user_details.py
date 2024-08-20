from pydantic import BaseModel, Field


class UserDetails(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=1, max_length=100)
