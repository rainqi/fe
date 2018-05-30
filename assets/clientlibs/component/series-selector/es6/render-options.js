export default (props, option, isInit) => `
		<div tabindex="0" class="dropdown-menu list-cars">
	    <ul class=" ">
	      ${props && props.length && isInit ?
					props.map((item, index) => `
	        <li
	          class="list-cars-item" data-index="${index}" data-img="${item.image ? item.image : ''}" type="${item.type ? item.type : ''}" data-note="${item.note ? item.note : ''}" 
	          data-value="${item.value ? item.value : ''}" 
	          data-name="${item.name}">
	          <a href="javascript:void(0);" data-index="${index}" data-img="${item.image ? item.image : ''}" data-note="${item.note ? item.note : ''}" 
	          data-value="${item.value ? item.value : ''}" data-name="${item.name}" >${item.name}</a>
	        </li>
	      `).join("") : ''}
	    </ul>
	  </div>
	  <button
	    class="dropdown-toggle btn-select" 
	    type="button" 
	    data-toggle="dropdown"
	    model-select-btn
	  >
	    ${option.select}
	  </button>
`;
