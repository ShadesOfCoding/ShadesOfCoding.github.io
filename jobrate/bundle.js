(function (d3) {
  'use strict';

  const colorLegend = (selection, props) => {
    const {
      colorScale,
      circleRadius,
      spacing,
      textOffset
    } = props;

    const groups = selection.selectAll('g')
      .data(colorScale.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        );
    groups.exit().remove();

    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  };

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = (data) => {

    const xValue = (d) => d.timestamp;
    const xAxisLabel = 'Year';

    const yValue = (d) => d.rate;
    const yAxisLabel = 'Ratio';

    const colorValue = (d) => d.city;

    const margin = {
      top: 80,
      right: 50,
      bottom: 88,
      left: 105,
    };
    const innerWidth =
      width - margin.left - margin.right;
    const innerHeight =
      height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    const colorScale = d3.scaleOrdinal(
      d3.schemeCategory10
    );

    const g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left},${margin.top})`
      );
    //f
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    //yAxisG.selectAll('.domain').remove();

    yAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g
      .append('g')
      .call(xAxis)
      .attr(
        'transform',
        `translate(0,${innerHeight})`
      );
    xAxisG.select('.domain').remove();

    xAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', 60)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    const lineGenerator = d3.line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(d3.curveBasis);

    const lastYValue = (d) =>
      yValue(d.values[d.values.length - 1]);

    const nested = d3.nest()
      .key(colorValue)
      .entries(data)
      .sort((a, b) =>
        d3.descending(lastYValue(a), lastYValue(b))
      );

    console.log(nested);

    colorScale.domain(nested.map((d) => d.key));

    g.selectAll('.line-path')
      .data(nested)
      .enter()
      .append('path')
      .attr('class', 'line-path')
      .attr('d', (d) => lineGenerator(d.values))
      .attr('stroke', (d) => colorScale(d.key));

    g.append('text')
      .attr('class', 'title')
      .attr('y', -20)
      .attr('x', innerWidth / 5)
      .text(title);

    svg
      .append('g')
      .attr('transform', `translate(790,100)`)
      .call(colorLegend, {
        colorScale,
        circleRadius: 10,
        spacing: 30,
        textOffset: 15,
      });
  };

  d3.csv(
    'https://raw.githubusercontent.com/chawinkk/dataForclass-HW/main/unemploymentrate_DE%20Muitipleline.csv'
  ).then((data) => {
    data.forEach((d) => {
      d.rate = +d.rate;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
  });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbG9yTGVnZW5kLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvbG9yTGVnZW5kID0gKHNlbGVjdGlvbiwgcHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbG9yU2NhbGUsXG4gICAgY2lyY2xlUmFkaXVzLFxuICAgIHNwYWNpbmcsXG4gICAgdGV4dE9mZnNldFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZ3JvdXBzID0gc2VsZWN0aW9uLnNlbGVjdEFsbCgnZycpXG4gICAgLmRhdGEoY29sb3JTY2FsZS5kb21haW4oKSk7XG4gIGNvbnN0IGdyb3Vwc0VudGVyID0gZ3JvdXBzXG4gICAgLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd0aWNrJyk7XG4gIGdyb3Vwc0VudGVyXG4gICAgLm1lcmdlKGdyb3VwcylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSkgPT5cbiAgICAgICAgYHRyYW5zbGF0ZSgwLCAke2kgKiBzcGFjaW5nfSlgXG4gICAgICApO1xuICBncm91cHMuZXhpdCgpLnJlbW92ZSgpO1xuXG4gIGdyb3Vwc0VudGVyLmFwcGVuZCgnY2lyY2xlJylcbiAgICAubWVyZ2UoZ3JvdXBzLnNlbGVjdCgnY2lyY2xlJykpXG4gICAgICAuYXR0cigncicsIGNpcmNsZVJhZGl1cylcbiAgICAgIC5hdHRyKCdmaWxsJywgY29sb3JTY2FsZSk7XG5cbiAgZ3JvdXBzRW50ZXIuYXBwZW5kKCd0ZXh0JylcbiAgICAubWVyZ2UoZ3JvdXBzLnNlbGVjdCgndGV4dCcpKVxuICAgICAgLnRleHQoZCA9PiBkKVxuICAgICAgLmF0dHIoJ2R5JywgJzAuMzJlbScpXG4gICAgICAuYXR0cigneCcsIHRleHRPZmZzZXQpO1xufSIsImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgc2NhbGVUaW1lLFxuICBzY2FsZU9yZGluYWwsXG4gIGV4dGVudCxcbiAgYXhpc0xlZnQsXG4gIGF4aXNCb3R0b20sXG4gIGxpbmUsXG4gIGN1cnZlQmFzaXMsXG4gIG5lc3QsXG4gIHNjaGVtZUNhdGVnb3J5MTAsXG4gIGRlc2NlbmRpbmcsXG4gIG5pY2UsXG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgY29sb3JMZWdlbmQgfSBmcm9tICcuL2NvbG9yTGVnZW5kJztcbmNvbnN0IHN2ZyA9IHNlbGVjdCgnc3ZnJyk7XG5cbmNvbnN0IHdpZHRoID0gK3N2Zy5hdHRyKCd3aWR0aCcpO1xuY29uc3QgaGVpZ2h0ID0gK3N2Zy5hdHRyKCdoZWlnaHQnKTtcblxuY29uc3QgcmVuZGVyID0gKGRhdGEpID0+IHtcbiAgY29uc3QgdGl0bGUgPVxuICAgICdNdWx0aXBsZSBMaW5lIENoYXJ0IG9mIGVtcGxveW1lbnRyYXRlJztcblxuICBjb25zdCB4VmFsdWUgPSAoZCkgPT4gZC50aW1lc3RhbXA7XG4gIGNvbnN0IHhBeGlzTGFiZWwgPSAnWWVhcic7XG5cbiAgY29uc3QgeVZhbHVlID0gKGQpID0+IGQucmF0ZTtcbiAgY29uc3QgeUF4aXNMYWJlbCA9ICdSYXRpbyc7XG5cbiAgY29uc3QgY29sb3JWYWx1ZSA9IChkKSA9PiBkLmNpdHk7XG5cbiAgY29uc3QgbWFyZ2luID0ge1xuICAgIHRvcDogODAsXG4gICAgcmlnaHQ6IDUwLFxuICAgIGJvdHRvbTogODgsXG4gICAgbGVmdDogMTA1LFxuICB9O1xuICBjb25zdCBpbm5lcldpZHRoID1cbiAgICB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBjb25zdCBpbm5lckhlaWdodCA9XG4gICAgaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG5cbiAgY29uc3QgeFNjYWxlID0gc2NhbGVUaW1lKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pO1xuXG4gIGNvbnN0IHlTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKVxuICAgIC5uaWNlKCk7XG5cbiAgY29uc3QgY29sb3JTY2FsZSA9IHNjYWxlT3JkaW5hbChcbiAgICBzY2hlbWVDYXRlZ29yeTEwXG4gICk7XG5cbiAgY29uc3QgZyA9IHN2Z1xuICAgIC5hcHBlbmQoJ2cnKVxuICAgIC5hdHRyKFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICBgdHJhbnNsYXRlKCR7bWFyZ2luLmxlZnR9LCR7bWFyZ2luLnRvcH0pYFxuICAgICk7XG4gIC8vZlxuICBjb25zdCB4QXhpcyA9IGF4aXNCb3R0b20oeFNjYWxlKVxuICAgIC50aWNrU2l6ZSgtaW5uZXJIZWlnaHQpXG4gICAgLnRpY2tQYWRkaW5nKDE1KTtcblxuICBjb25zdCB5QXhpcyA9IGF4aXNMZWZ0KHlTY2FsZSlcbiAgICAudGlja1NpemUoLWlubmVyV2lkdGgpXG4gICAgLnRpY2tQYWRkaW5nKDEwKTtcblxuICBjb25zdCB5QXhpc0cgPSBnLmFwcGVuZCgnZycpLmNhbGwoeUF4aXMpO1xuICAvL3lBeGlzRy5zZWxlY3RBbGwoJy5kb21haW4nKS5yZW1vdmUoKTtcblxuICB5QXhpc0dcbiAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAuYXR0cignY2xhc3MnLCAnYXhpcy1sYWJlbCcpXG4gICAgLmF0dHIoJ3knLCAtNDApXG4gICAgLmF0dHIoJ3gnLCAtaW5uZXJIZWlnaHQgLyAyKVxuICAgIC5hdHRyKCdmaWxsJywgJ2JsYWNrJylcbiAgICAuYXR0cigndHJhbnNmb3JtJywgYHJvdGF0ZSgtOTApYClcbiAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAudGV4dCh5QXhpc0xhYmVsKTtcblxuICBjb25zdCB4QXhpc0cgPSBnXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmNhbGwoeEF4aXMpXG4gICAgLmF0dHIoXG4gICAgICAndHJhbnNmb3JtJyxcbiAgICAgIGB0cmFuc2xhdGUoMCwke2lubmVySGVpZ2h0fSlgXG4gICAgKTtcbiAgeEF4aXNHLnNlbGVjdCgnLmRvbWFpbicpLnJlbW92ZSgpO1xuXG4gIHhBeGlzR1xuICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgIC5hdHRyKCdjbGFzcycsICdheGlzLWxhYmVsJylcbiAgICAuYXR0cigneScsIDYwKVxuICAgIC5hdHRyKCd4JywgaW5uZXJXaWR0aCAvIDIpXG4gICAgLmF0dHIoJ2ZpbGwnLCAnYmxhY2snKVxuICAgIC50ZXh0KHhBeGlzTGFiZWwpO1xuXG4gIGNvbnN0IGxpbmVHZW5lcmF0b3IgPSBsaW5lKClcbiAgICAueCgoZCkgPT4geFNjYWxlKHhWYWx1ZShkKSkpXG4gICAgLnkoKGQpID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAgIC5jdXJ2ZShjdXJ2ZUJhc2lzKTtcblxuICBjb25zdCBsYXN0WVZhbHVlID0gKGQpID0+XG4gICAgeVZhbHVlKGQudmFsdWVzW2QudmFsdWVzLmxlbmd0aCAtIDFdKTtcblxuICBjb25zdCBuZXN0ZWQgPSBuZXN0KClcbiAgICAua2V5KGNvbG9yVmFsdWUpXG4gICAgLmVudHJpZXMoZGF0YSlcbiAgICAuc29ydCgoYSwgYikgPT5cbiAgICAgIGRlc2NlbmRpbmcobGFzdFlWYWx1ZShhKSwgbGFzdFlWYWx1ZShiKSlcbiAgICApO1xuXG4gIGNvbnNvbGUubG9nKG5lc3RlZCk7XG5cbiAgY29sb3JTY2FsZS5kb21haW4obmVzdGVkLm1hcCgoZCkgPT4gZC5rZXkpKTtcblxuICBnLnNlbGVjdEFsbCgnLmxpbmUtcGF0aCcpXG4gICAgLmRhdGEobmVzdGVkKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZCgncGF0aCcpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtcGF0aCcpXG4gICAgLmF0dHIoJ2QnLCAoZCkgPT4gbGluZUdlbmVyYXRvcihkLnZhbHVlcykpXG4gICAgLmF0dHIoJ3N0cm9rZScsIChkKSA9PiBjb2xvclNjYWxlKGQua2V5KSk7XG5cbiAgZy5hcHBlbmQoJ3RleHQnKVxuICAgIC5hdHRyKCdjbGFzcycsICd0aXRsZScpXG4gICAgLmF0dHIoJ3knLCAtMjApXG4gICAgLmF0dHIoJ3gnLCBpbm5lcldpZHRoIC8gNSlcbiAgICAudGV4dCh0aXRsZSk7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoNzkwLDEwMClgKVxuICAgIC5jYWxsKGNvbG9yTGVnZW5kLCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY2lyY2xlUmFkaXVzOiAxMCxcbiAgICAgIHNwYWNpbmc6IDMwLFxuICAgICAgdGV4dE9mZnNldDogMTUsXG4gICAgfSk7XG59O1xuXG5jc3YoXG4gICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vY2hhd2lua2svZGF0YUZvcmNsYXNzLUhXL21haW4vdW5lbXBsb3ltZW50cmF0ZV9ERSUyME11aXRpcGxlbGluZS5jc3YnXG4pLnRoZW4oKGRhdGEpID0+IHtcbiAgZGF0YS5mb3JFYWNoKChkKSA9PiB7XG4gICAgZC5yYXRlID0gK2QucmF0ZTtcbiAgICBkLnRpbWVzdGFtcCA9IG5ldyBEYXRlKGQudGltZXN0YW1wKTtcbiAgfSk7XG4gIHJlbmRlcihkYXRhKTtcbn0pO1xuIl0sIm5hbWVzIjpbInNlbGVjdCIsInNjYWxlVGltZSIsImV4dGVudCIsInNjYWxlTGluZWFyIiwic2NhbGVPcmRpbmFsIiwic2NoZW1lQ2F0ZWdvcnkxMCIsImF4aXNCb3R0b20iLCJheGlzTGVmdCIsImxpbmUiLCJjdXJ2ZUJhc2lzIiwibmVzdCIsImRlc2NlbmRpbmciLCJjc3YiXSwibWFwcGluZ3MiOiI7OztFQUFPLE1BQU0sV0FBVyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssS0FBSztFQUNqRCxFQUFFLE1BQU07RUFDUixJQUFJLFVBQVU7RUFDZCxJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxVQUFVO0VBQ2QsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNaO0VBQ0EsRUFBRSxN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