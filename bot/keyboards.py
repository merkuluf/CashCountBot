from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder
from os import getenv as env

CLIENT_URL='https://client.a.pinggy.online'

def main_kb():
    main_keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Приложение", web_app=WebAppInfo(url=CLIENT_URL)
                )
            ]
        ]
    )
    return main_keyboard
