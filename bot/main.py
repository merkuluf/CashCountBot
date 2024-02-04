import asyncio
from aiogram import Bot, Dispatcher, F
from os import getenv as env
from dotenv import load_dotenv
import handlers

HELLO_MESSAGE = "Cash Counter Bot Started"


async def on_start(bot: Bot):
    print(HELLO_MESSAGE)
    await bot.send_message(chat_id=269521814, text=HELLO_MESSAGE)


async def main():
    load_dotenv()
    bot = Bot(env("BOT_TOKEN"))
    dp = Dispatcher()
    dp.startup.register(on_start)

    dp.include_routers(handlers.router)
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
