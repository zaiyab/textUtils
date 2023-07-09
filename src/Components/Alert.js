import React from 'react'

export default function Alert(props) {

  return (
   
    props.Alert &&  <div className={`alert alert-${props.Alert.type} alert-dismissible fade show`} role="alert">
  <strong>{props.Alert.msg}</strong>

</div>
   
  )
}
