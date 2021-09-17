import React from 'react'
import NotFound from '@/components/404'
export default class Error extends React.Component {


  render() {
    return (
      <div className="error-wrap">
        <div className="w">
          <NotFound/>
        </div>
      </div>
    )
  }
}
