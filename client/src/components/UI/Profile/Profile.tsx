import { telegram_id } from '../../../App'
import { useGetUserQuery, useGetProfilePhotoQuery } from '../../../redux/api'
import { default_img } from '../../../utils/IMAGES'
import '../../../css/ui/profile.css'
import Loading from '../../States/Loading'

function Profile() {
    const { isLoading: isUserLoading, data: user } =
        useGetUserQuery(telegram_id)

    const {
        isLoading: isPhotoLoading,
        data: photo,
        isError: isPhotoError,
    } = useGetProfilePhotoQuery(telegram_id)

    if (isUserLoading || isPhotoLoading) return <Loading />

    const photoSrc = isPhotoLoading
        ? default_img
        : isPhotoError
        ? default_img
        : `data:image/jpeg;base64,${photo.image}`

    const userBalance = user?.wallets.length === 0 ? 0 : 0

    return (
        <div className='profile'>
            <div className='profile-info'>
                <p className='pi-username'>{user?.username}</p>
                <p className='pi-balance'>{userBalance}</p>
            </div>
            <div>
                <img className='userpic' src={photoSrc}></img>
            </div>
        </div>
    )
}

export default Profile
