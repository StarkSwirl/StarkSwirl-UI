import React from "react"
import AlertIcon from "@/lib/icons/alertIcon"
import InformationIcon from "@/lib/icons/informationIcon"

export default function NotificationTab() {
  return (
    <article className="notification main-notification is-warning">
      <button></button>
      <div className="media">
        <div className="media-left">
          <span>
            <AlertIcon />
            <InformationIcon />
          </span>
        </div>
        <div>
          {/* <span>this is a warning note</span> */}
          <span>save your secret and nullifier safely</span>
        </div>
      </div>
    </article>
  )
}
