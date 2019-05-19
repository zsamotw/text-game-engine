const R = require('rxjs')
const { switchMap, map, flatMap } = require('rxjs/operators')

// const intervals = R.interval(2000).pipe(map(val => val + 1))
const intervals2 = R.interval(3000).pipe(switchMap(val => R.of(val + 1)))

// intervals.subscribe(i => console.log('intervals: ', i))
intervals2.subscribe(i => console.log('intervals2: ', i))

const xs = R.of([1, 2, 3, 4, 5])
const ys = R.of([3, 4])

const res = xs.pipe(flatMap(x => ys.pipe(map(y => x.filter(a => y.every(b => b !== a))))))
res.subscribe(r => console.log(r))