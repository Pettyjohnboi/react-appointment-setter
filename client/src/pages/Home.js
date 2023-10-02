function Home() {
    return (
        <div class="container">
            <div class="row"> 
                <div class="col">
                <form>
                    <input type="text" name="name" placeholder="Name"/>
                    <br />
                    <input type="tel" name="phone" placeholder="Phone Number"/>
                    <br />
                    <input type="email" name="email" placeholder="Email"/>
                    <br />
                    <input type="date" name="date"/>
                    <br />
                    <input type="time" name="time" placeholder="time"/>
                    <br />
                    <input type="submit" value="Submit"/>
                </form>
                </div>
                <div class="col">
                    This is current appointments
                </div>
            </div>
        </div>
    );
}

export default Home;