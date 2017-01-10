function post(){
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('POST', 'http://localhost:4000/graphql');
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        return request;
}

export {post};