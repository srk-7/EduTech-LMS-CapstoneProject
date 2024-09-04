import React from 'react';
import logo from '../assets/logo.png';

function LandingPage() {
    return (
        <div className="font-sans text-center min-h-screen flex flex-col">
            <header className="bg-blue-500 text-white py-12 px-5 flex-grow flex flex-col justify-center">
                <img src={logo} alt="EduLearn LMS Logo" className="h-48 mx-auto mb-5" />
                <h1 className="text-4xl font-bold">Welcome to EduLearn LMS</h1>
                <p className="text-lg mt-4">Your gateway to an organized and engaging digital learning experience.</p>
            </header>

            <section className="flex flex-col md:flex-row justify-around my-16 flex-grow">
                <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold text-blue-500 mb-3">Interactive Learning</h2>
                    <p className="text-base leading-relaxed">Engage with interactive content, videos, and assignments tailored to enhance your learning experience.</p>
                </div>
                <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold text-blue-500 mb-3">Organized Structure</h2>
                    <p className="text-base leading-relaxed">Stay organized with well-structured courses, session details, and easy access to all your learning materials.</p>
                </div>
                <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-blue-500 mb-3">Right Platform</h2>
                    <p className="text-base leading-relaxed">Receive assignments and stay on track with your learning goals.</p>
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-5 flex-grow">
                <h2 className="text-3xl font-bold text-blue-500 mb-6">Join Us Today!</h2>
                <p className="text-lg mb-8">Whether you are a teacher looking to manage your classes or a student ready to learn, EduLearn LMS has everything you need.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/register-teacher" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Register as Teacher</a>
                    <a href="/login-student" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Login as Student</a>
                    <a href="/login-teacher" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Login as Teacher</a>
                </div>
            </section>

            <footer className="mt-auto py-6 bg-gray-800 text-white">
                <p>&copy; 2024 EduLearn LMS. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;