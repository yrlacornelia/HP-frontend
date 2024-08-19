const Testtable = () => {
    return ( <>
        <main>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Age</th>
                        <th>Date Of Birth</th>
                        <th>Status</th>
                        <th>Progress (%)</th>
                        <th>Gender</th>
                        <th>Sales</th>
                        <th>Win Ratio</th>
                        <th>Index</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ID">100344</td>
                        <td data-label="Name"><img src="https://i.postimg.cc/FR5xjr4g/user.png" alt="" />John</td>
                        <td data-label="Country"><img src="https://i.postimg.cc/vZXRqKBV/usa.png" alt="" />USA</td>
                        <td data-label="Age">37</td>
                        <td data-label="DOB">April 30, 1988</td>
                        <td data-label="Status"><span className="active">Active</span></td>
                        <td data-label="Progress"><span className="progress"><em style="width:20%"></em></span> 20%</td>
                        <td data-label="Gender"><i className="fa fa-mars" aria-hidden="true"></i> Male</td>
                        <td data-label="Growth In Sales">20% <i className="fa fa-arrow-up"></i></td>
                        <td data-label="Win Ratio">1:3</td>
                        <td data-label="Index">2:5</td>
                        <td data-label="Link"><a href="https://google.com" target="_blank"><i className="fa fa-link"></i></a></td>
                    </tr>
                    <tr>
                        <td data-label="ID">100344</td>
                        <td data-label="Name"><img src="https://i.postimg.cc/FR5xjr4g/user.png" alt="" />John</td>
                        <td data-label="Country"><img src="https://i.postimg.cc/vZXRqKBV/usa.png" alt="" />USA</td>
                        <td data-label="Age">37</td>
                        <td data-label="DOB">April 30, 1988</td>
                        <td data-label="Status"><span className="active">Active</span></td>
                        <td data-label="Progress"><span className="progress"><em style="width:80%"></em></span> 80%</td>
                        <td data-label="Gender"><i className="fa fa-venus" aria-hidden="true"></i> Female</td>
                        <td data-label="Growth In Sales">-5% <i className="fa fa-arrow-down"></i></td>
                        <td data-label="Win Ratio">1:3</td>
                        <td data-label="Index">2:5</td>
                        <td data-label="Link"><a href="https://google.com" target="_blank"><i className="fa fa-link"></i></a></td>
                    </tr>
                    <tr>
                        <td data-label="ID">100344</td>
                        <td data-label="Name"><img src="https://i.postimg.cc/FR5xjr4g/user.png" alt="" />John</td>
                        <td data-label="Country"><img src="https://i.postimg.cc/vZXRqKBV/usa.png" alt="" />USA</td>
                        <td data-label="Age">37</td>
                        <td data-label="DOB">April 30, 1988</td>
                        <td data-label="Status"><span className="inactive">Inactive</span></td>
                        <td data-label="Progress"><span className="progress"><em style="width:35%"></em></span> 35%</td>
                        <td data-label="Gender"><i className="fa fa-mars" aria-hidden="true"></i> Male</td>
                        <td data-label="Growth In Sales">20% <i className="fa fa-arrow-up"></i></td>
                        <td data-label="Win Ratio">1:3</td>
                        <td data-label="Index">2:5</td>
                        <td data-label="Link"><a href="https://google.com" target="_blank"><i className="fa fa-link"></i></a></td>
                    </tr>
                </tbody>
            </table>
        </main>
        </> );
}
 
export default Testtable;