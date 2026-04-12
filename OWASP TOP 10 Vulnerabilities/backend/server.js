const http=require('http');
const port =3000;

const server = http.createServer();

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
