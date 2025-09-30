import { Link } from "react-router-dom";

/**
 *  This component allows users to navigate to different routes  
 *  without refreshing the page.
 * 
 *  @returns Navigation element as JavaScript XML.
 */
function Navigation() {
    console.log("navigation");

    return(
        <nav>
            <Link to="/">Home </Link>
            <Link to="/create">Add Exercise </Link>           
        </nav>
    )
}

export default Navigation