// Swiper
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { slides } from './utils/slides'
import { useGetUserQuery } from '../redux/api'
import { WebApp, telegram_id } from '../App'
import Loading from './States/Loading'
import Message from './States/Message'
import Registration from './Forms/Registration'
import { useEffect } from 'react'
import { setMainButton } from '../redux/buttonSlice'
import { useDispatch } from 'react-redux'
import Modal from './UI/Modals/Modal'

function AppScreen() {
    const dispatch = useDispatch()
    const {
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
        refetch: refetchUser,
    } = useGetUserQuery(telegram_id)

    useEffect(() => {
        WebApp.ready()
        WebApp.expand()
        WebApp.enableClosingConfirmation()
    }, [])

    if (isUserLoading) return <Loading />
    if (isUserError && 'status' in userError) {
        if (userError.status === 404)
            return <Registration refetchUser={refetchUser} />
        return <Message text='Произошла ошибка' />
    }

    return (
        <>
            <Modal />
            <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                    if (slides[swiper.activeIndex].name === 'Home') {
                        dispatch(setMainButton(true))
                    } else {
                        dispatch(setMainButton(false))
                    }
                }}
                onSlideChange={(swiper) => {
                    if (slides[swiper.activeIndex].name === 'Home') {
                        dispatch(setMainButton(true))
                    } else {
                        dispatch(setMainButton(false))
                    }
                }}
            >
                {slides.map((item) => (
                    <SwiperSlide key={item.name}>
                        <main>{item.element}</main>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AppScreen
