import express from 'express';
import {app} from '../express';

// Static Web Pages and Assets
app.use(express.static('public'));
