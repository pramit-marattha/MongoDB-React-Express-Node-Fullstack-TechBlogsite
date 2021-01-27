import React from 'react';
import Link from 'next/link';
import BookIcon from '@material-ui/icons/Book';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RssFeedIcon from '@material-ui/icons/RssFeed';


const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="item-footer">
					<Link href="/">
						<a className="item-footer-logo">
							<img
								style={{maxWidth:"150px",maxHeight:"auto"}}
								className="selectionNone"
								src="/static/assets/Lantern.svg"
								alt="Tech blogsite"
							/>
						</a>
					</Link>
				</div>
				<div className="item-footer">
				<span>
							<strong>Get Connected <RssFeedIcon/></strong>
						</span>
				<ul>
				<li>
							<a
								href="https://www.twitter.com/pramit_armpit"
								className="social-link"
								target="_blank"
							>
								<img src="/static/assets/svg/tweet.svg" alt="twitter" />
								<span>Twitter</span>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/pramit-marattha"
								className="social-link"
								target="_blank"
							>
								<img src="/static/assets/svg/Octocat.png" alt="github" />
								<span>GitHub</span>
							</a>
						</li>
						</ul>
				</div>
				<div className="item-footer">
					<div>
						<span>
							<strong>Let's Get Started <DoubleArrowIcon/></strong>
						</span>
						<ul>
							<li>
								<Link href="/signup">
									<button className="btn btn-info">Register</button>
								</Link>
							</li>
							<li>
								<Link href="/login">
									<button className="btn btn-success">Login</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="item-footer">
					<div>
						<span>
							<strong> Recent Blogposts<BookIcon/></strong>
						</span>
						<ul>
							<li>
								<Link href="/blogs">
									<button className="btn btn-warning">Blogs</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div><br/><br/>
			<div className="copyright">
				<span>&copy; Copyright {new Date().getFullYear()} pramit marattha <small> (Image copyright goes to <a href="" >freepik </a>,<a href="https://illlustrations.co/" >illlustrations.co</a>,<a href="https://dribbble.com/lobanovskiy" >lobanovskiy</a>)</small> <br/></span>
			</div>

		</footer>
		
	)
}

export default Footer
