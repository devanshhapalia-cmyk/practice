import React from "react";
export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      width: window.innerWidth
    };
    console.log("Constructor: Component created");
  }

  componentDidMount() {
    console.log("componentDidMount: Page loaded");

    fetch(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
      .then(res => res.json())
      .then(data => this.setState({ user: data }));

    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate: Component updated");

    if (prevProps.userId !== this.props.userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${this.props.userId}`)
        .then(res => res.json())
        .then(data => this.setState({ user: data }));
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount: Leaving page");

    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    console.log("Render");

    if (!this.state.user) return <p>Loading...</p>;

    return (
      <div>
        <h2>{this.state.user.name}</h2>
        <p>Email: {this.state.user.email}</p>
        <p>Window Width: {this.state.width}px</p> 
      </div>
    );
  }
}

// function UserProfile({ userId }) {
//   const [user, setUser] = React.useState(null);
//   const [width, setWidth] = React.useState(window.innerWidth);

//   // Mount + Update
//   React.useEffect(() => {
//     console.log("Mounted or userId changed");

//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//       .then(res => res.json())
//       .then(data => setUser(data));

//     return () => {
//       console.log("Cleanup before next effect or unmount");
//     };
//   }, [userId]);

//   // Resize listener
//   React.useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{user.name}</h2>
//       <p>Email: {user.email}</p>
//       <p>Window Width: {width}px</p>
//     </div>
//   );
// }
