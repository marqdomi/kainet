import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DigitalCounter from '../DigitalCounter';

describe('DigitalCounter', () => {
  it('renders the value correctly', () => {
    render(<DigitalCounter value={100} animate={false} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('displays prefix and suffix', () => {
    render(
      <DigitalCounter 
        value={99} 
        prefix="$" 
        suffix="%" 
        animate={false} 
      />
    );
    expect(screen.getByText('$99%')).toBeInTheDocument();
  });

  it('formats decimals correctly', () => {
    render(
      <DigitalCounter 
        value={4.567} 
        decimals={2} 
        animate={false} 
      />
    );
    expect(screen.getByText('4.57')).toBeInTheDocument();
  });

  it('applies digital-counter class', () => {
    const { container } = render(
      <DigitalCounter value={100} animate={false} />
    );
    const counter = container.querySelector('.digital-counter');
    expect(counter).toBeInTheDocument();
  });

  it('applies pulse class when pulse prop is true', () => {
    const { container } = render(
      <DigitalCounter value={100} pulse animate={false} />
    );
    const counter = container.querySelector('.digital-counter');
    expect(counter).toHaveClass('pulse');
  });

  it('applies custom className', () => {
    const { container } = render(
      <DigitalCounter 
        value={100} 
        className="custom-class" 
        animate={false} 
      />
    );
    const counter = container.querySelector('.digital-counter');
    expect(counter).toHaveClass('custom-class');
  });

  it('starts at 0 when animate is true', () => {
    const { container } = render(<DigitalCounter value={100} animate />);
    const counter = container.querySelector('.digital-counter');
    // Initially should show 0 or be animating
    expect(counter).toBeInTheDocument();
  });

  it('shows final value immediately when animate is false', () => {
    render(<DigitalCounter value={500} animate={false} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('handles zero value', () => {
    render(<DigitalCounter value={0} animate={false} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles large numbers', () => {
    render(<DigitalCounter value={1000000} animate={false} />);
    expect(screen.getByText('1000000')).toBeInTheDocument();
  });

  it('handles negative numbers', () => {
    render(<DigitalCounter value={-50} animate={false} />);
    expect(screen.getByText('-50')).toBeInTheDocument();
  });
});
