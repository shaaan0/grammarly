let input = document.getElementById('input-file');
let content_target = document.getElementById('content-target');

input.addEventListener('change', getFile);
function getFile(event){
    const input = event.target;
    if('files' in input && input.files.length>0){
        placeFileContent(content_target,input.files[0])
    }

}

function placeFileContent(target, file){
    readFileContent(file).then(content => {
        target.value = content;
        fetch('https://api.textgears.com/spelling?key=8XvzJ2UWH3L8LLAt&text='+textarea.value+'!&language=en-GB')
            .then(response => response.json())
    }).catch(error => console.log(error))
}

function readFileContent(file){
    const reader = new FileReader()
    return new Promise((resolve,reject) => {
        reader.onload =event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}

(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('create');
    
      create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(content_target.value);
        link.style.display = 'block';
      }, false);
    })();
    