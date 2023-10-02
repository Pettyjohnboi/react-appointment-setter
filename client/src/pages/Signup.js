function Signup(){
    return(
        <div class="container">
            <div class="row"> 
                <div class="col">
                <form>
                    <input type="text" name="name" placeholder="Name"/>
                    <br />
                    <input type="email" name="email" placeholder="Email"/>
                    <br />
                    <input type="tel" name="phone" placeholder="Phone Number"/>
                    <br />
                    <input type="submit" value="Submit"/>
                </form>
                </div>
            </div>
        </div>
    )
}


export default Signup;