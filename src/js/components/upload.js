class BRUpload {

  constructor(name, component) {
    this.name = name;
    this.component = component;
    this._inputElement = this.component.querySelector('.upload-input');
    this._fileList = this.component.querySelector('.upload-file-list');
    this._header = this.component.querySelector('.upload-header');
    this._info = this.component.querySelector('.upload-info');
    this._size = this.component.querySelector('.upload-size');
    this._sizeNum = this.component.querySelector('.upload-size-num');
    this._sizeBytes = this.component.querySelector('.upload-size-bytes');
    this._fileArray = [];
    this._setBehavior();
  }

  _setBehavior() {
    this.component.addEventListener("dragenter", (event) => {
      this._drag(event)
    }, false);
		this.component.addEventListener("dragover", (event) => {
      this._drag(event)
    }, false);
    this.component.addEventListener("drop", (event) => {
      this._drop()
    }, false);

    if(this._inputElement) {
      this._fileArray = Array.from(this._inputElement.files);
      this._inputElement.addEventListener("change", (event) => {
        this._handleFiles(event);
      }, false);
    }
  }

  _drag(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  _drop(event) {
    event.stopPropagation();
    event.preventDefault();
    this._handleFiles(event.dataTransfer.files);
  }

  _handleFiles(files) {

    console.log(this._fileArray);

    let newFiles = !files.length ? Array.from(this._inputElement.files) : Array.from(files);
    this._fileArray = this._fileArray.concat(newFiles);
  
    console.log(this._fileArray)

    this._info.style.display = 'none';
    this._header.innerHTML = 'Arquivos Selecionados';
    
    this._updateFileList();
  }

  _updateFileList () {

    if (!this._fileArray.length) {
      this._fileList.innerHTML = "";
      this._info.style.display = '';
      this._header.innerHTML = 'Arraste e solte o(s) arquivo(s) do seu computador';
    } else {
      this._fileList.innerHTML = "";
      let list = document.createElement("ul");
      this._fileList.appendChild(list);
      for (let i = 0; i < this._fileArray.length; i++) {
        let li = document.createElement("li");
        list.appendChild(li);
        
        let info = document.createElement("span");
        info.innerHTML = this._fileArray[i].name ;
        li.appendChild(info);
        
        let del = document.createElement("div");
        del.addEventListener("click", () => {
          this._removeFile(i, event)
        }, false);
        del.className = 'del';
        let img = document.createElement("i");
        img.className = 'fa fa-times';
        del.appendChild(img);
        li.appendChild(del);
      }
    }
    this._updateSize();
  }

  _updateSize() {

    let nBytes = 0,
        oFiles = this._fileArray, 
        nFiles = oFiles.length;
    for (let nFileId = 0; nFileId < nFiles; nFileId++) {
      nBytes += oFiles[nFileId].size;
    }
    
    let sOutput = nBytes + " bytes";
    for (let aMultiples = ["KB", "MB", "GB", "TB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
      sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] ;
    }
  
    this._size.style.visibility = nFiles>0 ? "visible" : "hidden";
    this._sizeNum.innerHTML = nFiles;
    this._sizeBytes.innerHTML = sOutput;
  }

  _removeFile(index, event) {

    event.stopPropagation();
    event.preventDefault();
    this._fileArray.splice(index,1);
    this._updateFileList();
  }
}

let uploadList = [];
for (let brUpload of window.document.querySelectorAll(".br-upload")) {
  uploadList.push(new BRUpload("br-upload", brUpload));
}

// const inputElement = document.querySelector('.upload-input');
// const fileList = document.querySelector('.upload-file-list');
// const header = document.querySelector('.upload-header');
// const info = document.querySelector('.upload-info');
// const size = document.querySelector('.upload-size');
// const sizeNum = document.querySelector('.upload-size-num');
// const sizeBytes = document.querySelector('.upload-size-bytes');
// var fileArray = [];
// if(inputElement)
// 		fileArray = Array.from(inputElement.files);


// let dropbox;

// dropbox = document.querySelector('.br-upload');
// if(dropbox){
// 		dropbox.addEventListener("dragenter", drag, false);
// 		dropbox.addEventListener("dragover", drag, false);
// 		dropbox.addEventListener("drop", drop, false);
// }

// if(inputElement)
// 		inputElement.addEventListener("change", handleFiles, false);

// function handleFiles(files) {

//   console.log(Array.from(inputElement.files));
   
//   newFiles = !files.length ? Array.from(inputElement.files) : Array.from(files);
//   fileArray = fileArray.concat(newFiles);

//   info.style.display = 'none';
//   header.innerHTML = 'Arquivos Selecionados';
//   updateFileList();
// }

// function updateFileList () {

//   if (!fileArray.length) {
//     fileList.innerHTML = "";
//     info.style.display = '';
//     header.innerHTML = 'Arraste e solte o(s) arquivo(s) do seu computador';
//   } else {
//     fileList.innerHTML = "";
//     const list = document.createElement("ul");
//     fileList.appendChild(list);
//     for (let i = 0; i < fileArray.length; i++) {
//       const li = document.createElement("li");
//       list.appendChild(li);
      
//       const info = document.createElement("span");
//       info.innerHTML = fileArray[i].name ;
//       li.appendChild(info);
      
//       const del = document.createElement("div");
//       del.addEventListener("click", function(){removeFile(i, event)}, false);
//       del.className = 'del';
//       const img = document.createElement("i");
//       img.className = 'fa fa-times';
//       del.appendChild(img);
//       li.appendChild(del);
//     }
//   }
//   updateSize();
// }

// function removeFile(index, e) {

//   e.stopPropagation();
//   e.preventDefault();
//   fileArray.splice(index,1);
//   updateFileList();
// }

// function updateSize() {

//   let nBytes = 0,
//       oFiles = fileArray, 
//       nFiles = oFiles.length;
//   for (let nFileId = 0; nFileId < nFiles; nFileId++) {
//     nBytes += oFiles[nFileId].size;
//   }
  
//   let sOutput = nBytes + " bytes";
//   for (let aMultiples = ["KB", "MB", "GB", "TB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
//     sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] ;
//   }

//   size.style.visibility = nFiles>0 ? "visible" : "hidden";
//   sizeNum.innerHTML = nFiles;
//   sizeBytes.innerHTML = sOutput;
// }

// function drag(e) {
//   e.stopPropagation();
//   e.preventDefault();
// }

// function drop(e) {
//   e.stopPropagation();
//   e.preventDefault();

//   const dt = e.dataTransfer;
//   const files = dt.files;

//   handleFiles(files);
// }
