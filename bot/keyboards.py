from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder
from os import getenv as env


def main_kb():
    main_keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Приложение", web_app=WebAppInfo(url=f"{env('REACT_APP')}")
                )
            ]
        ]
    )
    return main_keyboard
