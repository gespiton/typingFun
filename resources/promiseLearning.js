function returnPromise(x) {
  return new Promise(resolve => {

    if (x > 5) {
      const opts = [1, 2].map(y => returnPromise(y));

      Promise.all(opts)
        .then(res => {
          const opts = [3, 4].map(y => returnPromise(y));
          return Promise.all(opts);
        })
        .then(res => {
          resolve(res);
        });

    } else {
      resolve(x);
    }
  });
}

returnPromise(6).then(res => {
  console.log(res);
});