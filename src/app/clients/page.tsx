export default function ClientsPage() {
    return (
        <main className="container" aria-labelledby="clients-heading">
            <h1 id="clients-heading">Clients</h1>
            <p>List of gym clients will appear here.</p>
            <table>
                <caption className="sr-only">Clients table</caption>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jane Doe</td>
                        <td>jane@example.com</td>
                        <td>Active</td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}
