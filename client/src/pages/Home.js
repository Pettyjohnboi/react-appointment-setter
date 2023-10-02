function Home() {
    return (
        <div class="container">
            <div class="row"> 
                <div class="col">
                <form>
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