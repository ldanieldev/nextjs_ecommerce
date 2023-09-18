import BeatLoader from 'react-spinners/BeatLoader'

export default function Loading() {
  return (
    <>
      <BeatLoader
        className="!flex justify-center relative top-1/4"
        size={48}
        color={'hsl(var(--pc))'}
      />
    </>
  )
}
