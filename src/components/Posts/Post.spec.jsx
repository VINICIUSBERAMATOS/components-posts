import React from 'react';
import { render, screen } from '@testing-library/react';
import { Post } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title 3',
      body: 'body 3',
      cover: 'img/img3.png',
    },
  ],
};
describe('<Post />', () => {
  it('should render posts', () => {
    render(<Post {...props} />);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);

    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute(
      'src',
      'img/img3.png',
    );
  });

  it('should not render post', () => {
    render(<Post />);
    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(
      0,
    );
  });

  it('should match snapshot', () => {
    const { container } = render(<Post {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
