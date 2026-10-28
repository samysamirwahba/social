
import { Circles } from 'react-loader-spinner'


export default function Loader() {
  return (
   <div  className="flex h-screen  justify-center items-center  w-full">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
  )
}
