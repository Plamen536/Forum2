const { setContext } = useContext(AppContext);

  const onLogin = () => {
    // TODO: validate form before submitting

    loginUser(form.email, form.password)
      .then(credential => {
        setContext({
          user: credential.user,
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch(e => console.log(e.message));
  };