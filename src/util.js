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

export const getDeliveryDate = () => {
  const currentTime = new Date();
  const startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0);
  const endTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 21, 0, 0);
  // const newCurrentTime = new Date(currentTime.getTime() + (3 * 60 * 60 * 1000));

  let dateDelivery = '';

  if (startTime <= currentTime && currentTime <= endTime) {
    dateDelivery = 'сегодня до 21:00';
  } else {
    if (currentTime < startTime) {
      dateDelivery = 'сегодня с 09:00';
    }

    if (currentTime > endTime) {
      dateDelivery = 'завтра с 09:00';
    }
  }

  return dateDelivery;
};

export const formatDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};