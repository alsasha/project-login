  
import 'jquery/dist/jquery.slim.min';
import "popper.js/dist/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete";
import registerUI from '../../config/register.config';

export function getAutocomplete(
  id,
  src = {
    Default: 1,
  }
) {
  $(`#${id}`).autocomplete({
    source: src,
    onSelectItem: onSelectItem,
    treshold: 1,
    maximumItems: 10,
    highlightClass: "text-danger",
  });
}

function onSelectItem(item, element) {
  element.setAttribute("value", item.label);
  element.dataset.index = item.value;
  registerUI.registerCity.disabled = 0;
}
