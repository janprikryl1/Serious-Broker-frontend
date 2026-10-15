import type { FC } from "react"
import { routes } from "@/utils/constants/routes.ts"

export const ErrorPage:FC = () => {
  return (
    <div className="error padding-top padding-bottom">
      <div className="container">
        <div className="error__wrapper">
          <div data-aos="fade-up" data-aos-duration="800">
            <div className="error__content text-center">
              <h2>
                <span>ooops!</span> Chyba
              </h2>
              <a
                href={routes.index.path}
                className="trk-btn trk-btn--border trk-btn--primary"
              >
                Zpět domů
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}