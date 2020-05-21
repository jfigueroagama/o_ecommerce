// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// JSX is translated to JS using Babel
// Stateless functional component
const Hello = props => (
  <div>Hello {props.name}!</div>
)

// If we do not pass a data to out component, 'David' is the default
Hello.defaultProps = {
  name: 'David'
}

// We can also have a class component
/*class Hello extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div>Hello {this.props.name}!</div>
    )
  }

}
*/

// We take the parameter of type string => PropTypes
Hello.propTypes = {
  name: PropTypes.string
}

// When the component is renderd we are passing name="React"
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.getElementById("root")
  )
})
