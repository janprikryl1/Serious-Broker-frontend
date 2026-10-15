import type { FC } from "react"
import { Link } from "react-router"
import { routes } from "@/utils/constants/routes.ts"

export const NotFound:FC = () => {
  return (
    <div className="error padding-top padding-bottom ">
      <div className="container">
        <div className="error__wrapper">
          <div data-aos="fade-up" data-aos-duration="800">
            <div className="error__content text-center">
              <h2>
                <span>ooops!</span> Stránka nenalezena
              </h2>
              <Link
                to={routes.index.path}
                className="trk-btn trk-btn--border trk-btn--primary"
              >
                Zpět domů
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}