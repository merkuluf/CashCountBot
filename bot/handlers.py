from aiogram import Router, Bot, F
from aiogram.types import Message
from aiogram.filters import Command
from keyboards import main_kb

router = Router()


@router.message(Command("start"))
async def start(message: Message, bot: Bot):
    await bot.send_message(
        chat_id=message.from_user.id, text="Добро пожаловать!", reply_markup=main_kb()
    )
