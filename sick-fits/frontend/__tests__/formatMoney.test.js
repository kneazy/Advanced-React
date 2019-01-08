import formatMoney from '../lib/formatMoney';


describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(2)).toEqual('$0.02');
  })

  it('leaves cents off for whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(200)).toEqual('$2');
    expect(formatMoney(20000000)).toEqual('$200,000');
  })
  
  it('works with whole and fractional dollars', () => {
    expect(formatMoney(120)).toEqual('$1.20');
    expect(formatMoney(233)).toEqual('$2.33');
    expect(formatMoney(20000333)).toEqual('$200,003.33');
    expect(formatMoney(200003338787777665544)).toEqual('$2,000,033,387,877,780,000.00');
  })
});