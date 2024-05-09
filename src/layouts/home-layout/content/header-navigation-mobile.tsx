import {
  capitalizeFirstLetterFromLowercase,
  convertSlugToText,
  convertToSlug,
} from '@/libs/helpers/format-text'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { setStateSearch } from '@/store/reducer/stateSearch'
import { usePathname } from '@/libs/hooks/usePathname'

export function HeaderNavigationMobile({
  setIsShow,
}: {
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch()
  const { firstPathname } = usePathname()
  const navigate = useNavigate()
  const token = Cookies.get('token')

  return (
    <div className="flex flex-col gap-y-48">
      <div className="flex flex-col gap-y-12 text-[2.4rem] text-black">
        {[
          'Dashboard',
          'Berita',
          'Profile',
          'Ujian',
          'Hasil Ujian',
          'Ganti Password',
        ].map((item, idx) => (
          <Link
            to={
              convertToSlug(item) === 'dashboard'
                ? '/'
                : `/${convertToSlug(item)}`
            }
            className={clsx(
              'flex items-center justify-between gap-x-8 border-b py-8 hover:cursor-pointer',
              {
                'text-primary':
                  capitalizeFirstLetterFromLowercase(item?.toLowerCase()) ===
                    convertSlugToText(firstPathname) ||
                  (firstPathname === '' && item === 'Dashboard'),
              },
            )}
            key={idx}
            onClick={() => {
              setIsShow(false)
              dispatch(setStateSearch({ find: '' }))
            }}
          >
            <span className="text-nowrap">{item}</span>
            <ChevronDown size={20} />
          </Link>
        ))}
      </div>

      {token === undefined ? (
        <div className="flex items-center justify-center gap-32">
          {['Login', 'Registrasi'].map((item, idx) => (
            <Link
              to={`/${item?.toLowerCase()}`}
              className={clsx(
                'flex-1 rounded-lg border px-24 py-12 text-center text-[2.4rem]',
                { 'border-transparent bg-primary text-white': idx % 2 === 0 },
                { 'border-primary text-primary': idx % 2 !== 0 },
              )}
              key={idx}
            >
              {item}
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="rounded-lg border border-transparent bg-primary px-24 py-12 text-center text-[2.4rem] text-white"
          onClick={() => {
            Cookies.remove('token')
            navigate('/login')
          }}
        >
          Logout
        </div>
      )}
    </div>
  )
}
