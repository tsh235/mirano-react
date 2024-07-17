export const getValidFilters = (filters) => {
  const validFilters = {};
  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key) && filters[key]) {
      validFilters[key] = filters[key];
    }
  }

  return validFilters;
};

export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...args) => {
    const prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => fn(...args), msec);
  }
};

export const isNumber = (n) => !isNaN(parseInt(n) && isFinite(n));

export const adjustElemPosition = (elem, count = 0) => {
  const rect = elem.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.left < 0) {
    elem.style.left = '0';
    elem.style.right = 'auto';
    elem.style.transform = 'translateX(0)';
  } else if (rect.right > viewportWidth) {
    elem.style.left = 'auto';
    elem.style.right = '0';
    elem.style.transform = 'translateX(0)';
  } else {
    elem.style.left = '50%';
    elem.style.right = 'auto';
    elem.style.transform = 'translateX(-50%)';
  }

  const postRect = elem.getBoundingClientRect();

  if ((postRect.left < 0 || postRect.right > viewportWidth) && count > 3) {
    adjustElemPosition(elem, ++count);
  }
};