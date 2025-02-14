// const { setContext } = useContext(AppContext);

//   const onLogin = () => {
//     // TODO: validate form before submitting

//     loginUser(form.email, form.password)
//       .then(credential => {
//         setContext({
//           user: credential.user,
//         });
//       })
//       .then(() => {
//         navigate('/');
//       })
//       .catch(e => console.log(e.message));
//   };

export default function Login() {
  return (
    <div>
      <h3>Login</h3>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
        <br /><br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <button>Login</button>
      </div>
    </div>
  );
}