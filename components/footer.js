import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-crimson border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col sm:flex-row md:flex-col items-center">
          <h2 className="text-white">
            New Mexico State University 
          </h2>
          <h3 className="text-4xl lg:text-5xl text-white font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Alumni Association
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
          </div>
        </div>
      </Container>
    </footer>
  )
}
