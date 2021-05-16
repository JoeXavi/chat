exports.success = function (request, response, message, code) {
    response.status(code || 200)
      .send({
          error:'',
          body:message
      });
  }
  
exports.error = function (request, response, error, code, details) {
    console.error(details)
    response.status(code || 500)
        .send({
            error: error,
            body: ''          
        });
  }