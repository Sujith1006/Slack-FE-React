const FakeAuth={
    isAuthenticated:localStorage.getItem('loginstatus'),

    authenticate(){
        this.isAuthenticated=true;
        localStorage.setItem('loginstatus',true);
    },
    logout(){
        this.isAuthenticated=false;
        localStorage.setItem('loginstatus',false);

    },
    getAuth()
    {
        return this.isAuthenticated;
    }
};

export default FakeAuth;