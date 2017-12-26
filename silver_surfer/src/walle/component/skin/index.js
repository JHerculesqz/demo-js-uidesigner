export default {
  themeChange: function (strTheme) {
    //1.get current theme
    var strClassName = document.body.className;

    if(strClassName){
      //2.kill me
      document.body.classList.remove(strClassName);
    }

    //3.change new girl friend
    if(strTheme){
      document.body.classList.add(strTheme);
    }
  }
}
