/* eslint-disable import/no-extraneous-dependencies */
import $ from 'jquery';

export function getComments(apiUrl, sitekey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${sitekey}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    url,
  }).done((data) => {
    cb(data);
  });
}

export function addComments(apiUrl, sitekey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
  }).done((datas) => {
    cb(datas);
  });
}
