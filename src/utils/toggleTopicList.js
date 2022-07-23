export const toggleTopicList = () => {
  document.body.classList.toggle('no-scroll');
  document.getElementById('TopicList').classList.toggle('topic-list-open');
  document.getElementById('click-catcher').classList.toggle('click-catcher-open');
  document.getElementById('topic-list-close-button').classList.toggle('topic-list-close-button-show');
}
