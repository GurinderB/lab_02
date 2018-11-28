function Pictures(picture) {
  this.image_url = picture.image_url;
  this.title = picture.title;
  this.description = picture.description;
  this.keyword = picture.keyword;
  this.horns = picture.horns;
}

Pictures.allPictures = [];

Pictures.prototype.render = function() {
  //render the pictures
  $('main').append('<div class="clone"></div>');
  let pictureClone = $('div[class="clone"]');
  let pictureHtml = $('#photo-template').html();
  pictureClone.html(pictureHtml);

  pictureClone.find('h2').text(this.title);
  pictureClone.find('img').attr('src', this.image_url);
  pictureClone.find('p').text(this.description);

  pictureClone.removeClass('clone');
  pictureClone.attr('class', this.keyword);
  pictureClone.attr('class', this.horns)
  console.log('render is running')
};

Pictures.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Pictures.allPictures.push(new Pictures(obj));
      });
    })
    .then(Pictures.loadPictures);
  console.log('readJSON is running');
};

Pictures.loadPictures = () => {
  Pictures.allPictures.forEach(picture => {
    picture.render();
    console.log('test')
  });
  console.log('loadPictures is running')
};

$(() => Pictures.readJson());
